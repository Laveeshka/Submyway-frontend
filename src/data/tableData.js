// ----------------------------------------------------------------------

function createData(subscription){
    const subscription_payments = subscription.subscription_payments;
    const lastPayment = subscription_payments[subscription_payments.length - 1];
    return {
        id: subscription.id,
        company: subscription.company.name,
        status: subscription.status ? "Active" : "Inactive",
        billing: subscription.billing,
        price: subscription.pricing,
        nextPaymentDate: lastPayment.next_payment_date,
        paid: lastPayment.paid,
    }
}

export const subscriptionsData = (subscriptions) => {
    if (subscriptions.length < 1) return [];
    const rows = subscriptions.map((sub) => 
            createData(sub)
    )
    console.log("rows are: ", rows)
    return rows;
}

export const headCells = [
    {
        id: 'company',
        numeric: false,
        disablePadding: true,
        label: 'Company'
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: "Status"
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: "Price"
    },
    {
        id: 'next-payment-date',
        numeric: false,
        disablePadding: false,
        label: "Next Payment Date"
    },
    {
        id: 'paid',
        numeric: false,
        disablePadding: false,
        label: "Paid?"
    },
]
