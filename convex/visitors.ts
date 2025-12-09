import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const authenticate = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, { token }) => {
    try {
      // Get JWT secret from environment variable
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT_SECRET environment variable is not configured");
      }

      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }

      const [headerB64, payloadB64, signatureB64] = parts;

      const encoder = new TextEncoder();
      const data = encoder.encode(`${headerB64}.${payloadB64}`);
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(jwtSecret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
      );

      // Convert base64url signature to ArrayBuffer
      const signatureBytes = Uint8Array.from(
        atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')),
        c => c.charCodeAt(0)
      );

      const isValid = await crypto.subtle.verify(
        'HMAC',
        key,
        signatureBytes,
        data
      );

      if (!isValid) {
        console.log("Invalid token signature");
        throw new Error("Invalid token signature");
      }

      const base64Payload = payloadB64
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const decodedPayload = atob(base64Payload);
      const payload = JSON.parse(decodedPayload);

      const { visitorId } = payload;
      if (!visitorId || typeof visitorId !== 'string') {
        throw new Error("Invalid token: visitorId not found");
      }

      const visitor = await ctx.db.get(visitorId as any);

      if (!visitor) {
        throw new Error("Visitor not found");
      }

      // Return the visitorId
      return { visitorId };
    } catch (error) {
      throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
})

export const visitorSignin = mutation({
  args: {
    magicToken: v.string(),
  },
  handler: async (ctx, { magicToken }) => {
    try {
      // Get JWT secret from environment variable
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT_SECRET environment variable is not configured");
      }

      // Find visitor with the magic token
      const visitor = await ctx.db
        .query("visitors")
        .filter((q) => q.eq(q.field("magicToken"), magicToken))
        .first();

      if (!visitor) {
        throw new Error("Invalid magic token");
      }

      // Create JWT token
      const header = {
        alg: "HS256",
        typ: "JWT"
      };

      const payload = {
        visitorId: visitor._id
      };

      // Base64url encode header and payload
      const base64UrlEncode = (obj: any) => {
        const json = JSON.stringify(obj);
        const base64 = btoa(json);
        return base64
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
      };

      const headerB64 = base64UrlEncode(header);
      const payloadB64 = base64UrlEncode(payload);

      // Sign the token using HMAC-SHA256
      const encoder = new TextEncoder();
      const data = encoder.encode(`${headerB64}.${payloadB64}`);
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(jwtSecret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );

      const signatureBuffer = await crypto.subtle.sign('HMAC', key, data);
      const signatureArray = new Uint8Array(signatureBuffer);

      // Convert signature to base64url
      const signatureB64 = btoa(String.fromCharCode(...signatureArray))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

      // Combine all parts
      const token = `${headerB64}.${payloadB64}.${signatureB64}`;

      return { token };
    } catch (error) {
      throw new Error(`Sign in failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
})

// Query to get visitor by barcode
export const getVisitorByBarcode = query({
  args: {
    barcode: v.string(),
  },
  handler: async (ctx, { barcode }) => {
    const visitor = await ctx.db
      .query("visitors")
      .withIndex("by_barcode", (q) => q.eq("barcode", barcode))
      .first();
    
    return visitor;
  }
});

// Mutation to get or create visitor and set checkedIn to true
export const getOrCreateVisitorAndCheckin = mutation({
  args: {
    barcode: v.string(),
    email: v.optional(v.string()),
  },
  handler: async (ctx, { barcode, email }) => {
    // Check if visitor already exists
    const existingVisitor = await ctx.db
      .query("visitors")
      .withIndex("by_barcode", (q) => q.eq("barcode", barcode))
      .first();

    if (existingVisitor) {
      // Update checkedIn to true
      await ctx.db.patch(existingVisitor._id, { checkedIn: true });
      return { magicToken: existingVisitor.magicToken };
    }

    // Create new visitor
    const magicToken = crypto.randomUUID();
    const guestMode = !email; // true if no email, false if email provided

    await ctx.db.insert("visitors", {
      magicToken,
      email: email || undefined,
      barcode,
      guestMode,
      checkedIn: true,
    });

    return { magicToken };
  }
});

// Query to get all visitors
export const getAllVisitors = query({
  handler: async (ctx) => {
    const visitors = await ctx.db.query("visitors").collect();
    return visitors;
  }
});

export const createAnonymousVisitor = mutation({
  args: {},
  handler: async (ctx) => {
    const magicToken = crypto.randomUUID();
    const barcode = `ANON-${Date.now()}`;
    
    const viewId = await ctx.db.insert("visitors", {
      magicToken,
      barcode,
      guestMode: true,
      checkedIn: true,
    });

    return { magicToken, barcode, visitorId: viewId };
  }
});

export const createVipVisitor = mutation({
  args: {},
  handler: async (ctx) => {
    const magicToken = crypto.randomUUID();
    const barcode = `VIP-${Date.now()}`;
    
    const viewId = await ctx.db.insert("visitors", {
      magicToken,
      barcode,
      guestMode: true,
      isVip: true,
      checkedIn: true,
    });

    return { magicToken, barcode, visitorId: viewId };
  }
});
