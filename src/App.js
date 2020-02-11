import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function App() {
  const [data, setData] = useState({ restaurants: [] });
  const [sort, setSorted] = useState(true);

  useEffect(async () => {
    const result = await axios(
      "https://raw.githubusercontent.com/woltapp/summer2020/master/restaurants.json"
    );
    setData(result.data);
  }, []);

  const Infobox = ({ restaurant }) => {
    return (
      <div>
          <CardActionArea>
        <Card className={classes.card}>
        
          <CardHeader
            action={<IconButton aria-label="settings"></IconButton>}
            title={restaurant.name}
          />
          
            <CardMedia className={classes.media} image={restaurant.image} />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
             {restaurant.description} 
            </Typography>
          </CardContent>
        </Card>
        </CardActionArea>
      </div>
    );
  };

  const sortAlphabetically = () => {
    if (sort) {
      data.restaurants.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setSorted(false);
    } else {
      data.restaurants.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
      setSorted(true);
    }
  };

  const useStyles = makeStyles(theme => ({
    cardGrid: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(8)
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6)
    },
    card: {
      minWidth: 355,
      maxWidth: 55,
      maxHeight: 800,
      padding: 5,
      margin: 10,
      minHeight: 300,
      display: "flex",
      flexDirection: "column"
    },
    media: {
      height: 140
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Grid container spacing={2} justify="center">
            <Button
              variant="contained"
              color="primary"
              onClick={sortAlphabetically}
            >
              Sort
            </Button>
          </Grid>
        </Container>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2} justify="center">
            {data.restaurants.map(restaurant => (
              <Infobox restaurant={restaurant} />
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default App;
