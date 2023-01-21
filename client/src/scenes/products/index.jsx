import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { useGetProductsQuery } from "../../state/api";

function Product({
  id, name, category, price, rating, description, supply, productStats,
}) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <CardContent>
        <Typography
          sx={{ color: theme.palette.secondary[700], fontSize: 14 }}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">{name}</Typography>
        <Typography sx={{ mb: "1.5rem", color: theme.palette.secondary[400] }}>
          $
          {Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ color: theme.palette.neutral[500] }}>
          <Typography>
            id:
            {" "}
            {id}
          </Typography>
          <Typography>
            Supply total:
            {" "}
            {supply}
          </Typography>
          <Typography>
            Total Sales This Year:
            {" "}
            {productStats[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Total Unit Sold This Year:
            {" "}
            {productStats[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

function Products() {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          pb="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          columnGap="1.33%"
          rowGap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {data.map(({
            _id, name, category, price, rating, description, supply, productStats,
          }) => (
            <Product
              key={_id}
              id={_id}
              name={name}
              category={category}
              price={price}
              rating={rating}
              description={description}
              supply={supply}
              productStats={productStats}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}

export default Products;
