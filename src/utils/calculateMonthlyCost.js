export const calculateMonthlyCost = (subscriptions) => {
    let subCost = 0;
    if (subscriptions.length > 0){
        subscriptions.forEach((sub) => {
            const billing = sub.billing;
            switch (billing) {
                case "weekly":
                    subCost += (sub.pricing * 4)
                    break;
                case "monthly":
                    subCost += sub.pricing
                    break;
                case "yearly":
                    subCost += (sub.pricing / 12)
                    break;
                default:
                    break;
            } 
        })
        return subCost;
    } else return subCost;
};