export const calculateYearlyCost = (subscriptions) => {
    let subCost = 0;
    if (subscriptions.length > 0){
        subscriptions.forEach((sub) => {
            const billing = sub.billing;
            switch (billing) {
                case "weekly":
                    subCost += (sub.pricing * 4 * 12)
                    break;
                case "monthly":
                    subCost += (sub.pricing * 12)
                    break;
                case "yearly":
                    subCost += sub.pricing
                    break;
                default:
                    break;
            } 
        })
        return subCost;
    } else return subCost;
};
