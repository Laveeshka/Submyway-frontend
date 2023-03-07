import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// ----------------------------------------------------------------------

export const createData = (subscription) => {
    const subscription_payments = subscription.subscription_payments;
    const lastPayment = subscription_payments[subscription_payments.length - 1];
    const formattedDate = format(parseISO(lastPayment.next_payment_date), 'dd MMM yyyy');
    const category = typeof subscription.categories[0] === 'undefined' ? "" : subscription.categories[0].title
    console.log("Formatted date is: ", formattedDate);
    return {
        id: subscription.id,
        company: subscription.company.name,
        status: subscription.status ? "Active" : "Inactive",
        billing: subscription.billing,
        price: subscription.pricing,
        nextPaymentDate: formattedDate,
        category: category,
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
        id: 'billing',
        numeric: false,
        disablePadding: false,
        label: "Billing"
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: "Price"
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: "Category"
    },
    {
        id: 'nextPaymentDate',
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
    {
        id: '',
        numeric: false,
        disablePadding: true
    }
]
