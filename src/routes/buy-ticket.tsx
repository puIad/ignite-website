import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/buy-ticket')({
  component: RouteComponent,
})

function RouteComponent() {
  console.log()
  const api_endpoint = import.meta.env.VITE_API_URL
  const transaction_uuid = crypto.randomUUID()
  const url = `https://dev.paypart.dz/app/guest?next=newTransaction
&sellerDelivery=false
&pickFromStore=false
&InvitationUuid=RSj29ba3
&deliveryWilaya=16
&deliveryCommune=
&deliveryPlace=
&buyerRemark=
&successUrl=http://localhost:3005/transaction-success?tr=${transaction_uuid}
&failUrl=http://localhost:3005/buy-ticket
&redirectionTag=${transaction_uuid}
&name=&email=&firstName=J&phoneNumber=`
  async function handleSubmit() {
    await fetch(`${api_endpoint}/post-payment`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ productId: 'TEST_TAG_001' })
    }).then(async res => console.log(await res.json()))
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center flex-col gap-5'>
      <button onClick={handleSubmit}>test</button>
      <a href={url}>
        checkout
      </a>
    </div>
  )
}
