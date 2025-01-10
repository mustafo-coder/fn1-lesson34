import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
export default async function OutlinedCard() {
  const res = await fetch(`${process.env.NEXT_APP_BASE_URL || ""}/api/works`);
  const works = await res.json();
  return (
    <div className="grid grid-cols-3 gap-5 container p-5">
      {works &&
        works.map((w: WorkI) => (
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {w.id}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {w.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {w.work_type}
                  </Typography>
                  <Typography variant="body2">
                    {w.salary} {w.currency}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </React.Fragment>
            </Card>
          </Box>
        ))}
    </div>
  );
}

interface WorkI {
  id: number;
  title: string;
  work_type: string;
  salary: number;
  currency: string;
  work_experience: number;
  created_at: string;
}
