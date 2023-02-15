// @mui
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import format from "date-fns/format";
// --------------------------------------------------------------------------

export default function ReviewForm({
  company,
  startDate,
  active,
  price,
  billing,
}) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Subscription summary
      </Typography>
      <List>
        <ListItem key={company} sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Company"
            secondary="The company which provides the subscription service"
          />
          <Typography variant="body2">
            {company.length > 0 ? (
              company
            ) : (
              <Typography variant="body2" color="error">
                Not chosen
              </Typography>
            )}
          </Typography>
        </ListItem>
        <ListItem key={startDate} sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Start date"
            secondary="The starting date of the subscription service"
          />
          <Typography variant="body2">
            {format(startDate, "dd MMM yyyy")}
          </Typography>
        </ListItem>
        <ListItem key="status" sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Status"
            secondary="The active/inactive status of the subscription service"
          />
          <Typography variant="body2">
            {active ? "Active" : "Inactive"}
          </Typography>
        </ListItem>
        <ListItem key={billing} sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Billing cycle"
            secondary="The billing cycle of the subscription service"
          />
          <Typography variant="body2">{billing}</Typography>
        </ListItem>
        <ListItem key={price} sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Price"
            secondary="The price of the subscription service per billing cycle"
          />
          <Typography variant="body2">{price}</Typography>
        </ListItem>
      </List>
    </>
  );
}
