import React, { useMemo } from 'react';
import { Paper, FormGroup, Button, FormLabel, InputBase, FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core';
import { formatCreditCardNumber } from '../CreditCardPreview/cardUtils';

const useStyles = makeStyles(() => ({
    container: {
        width: "26%",
        padding: " 2%",
        left: "50%",
        position: "absolute",
        transform: "translateX(-50%)translateY(-50%)",
        top: "50%",
        paddingTop: "10%"
    },
    expirationDateLabel: {
        transform: "translate(0,1.5px)scale(0.75)",
        transformOrigin: "top left"
    },
    dropdowns: {
        marginRight: "2%"
    },
    cvv: {
        position: "relative",
        float: "right",
        width:"50%"
    },
    submitButton: {
        marginTop: "5%"
    },
    input: {
        marginTop: "24px",
        borderRadius: 4,
        position: 'relative',
        backgroundColor: "white",
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: "#1b9dde",
        },
    }
}))

export default function CreditcardForm(props) {
    const classes = useStyles();

    const transformedCardNumber = useMemo(() => (
        formatCreditCardNumber(props.cardDetails.cardNumber)
    ), [props.cardDetails.cardNumber])
    return (
        <Paper elevation={3} className={classes.container}>
            <FormControl fullWidth margin={"dense"}>
                <InputLabel shrink htmlFor="cardNumber">
                    Card Number
                 </InputLabel>
                <InputBase className={classes.input} required onChange={props.handleChange} value={transformedCardNumber} id="cardNumber" name="cardNumber" />
            </FormControl>
            <FormControl fullWidth margin={"dense"}>
                <InputLabel shrink htmlFor="cardHolderName">
                    Card Holder Name
                 </InputLabel>
                <InputBase className={classes.input} required onChange={props.handleChange} value={props.cardDetails.cardHolderName} id="cardHolderName" name="cardHolderName" />
            </FormControl>
            <FormControl margin={"dense"} style={{width:"50%"}}>
                <FormLabel className={classes.expirationDateLabel} >Expiration date</FormLabel>
                <FormGroup margin={"dense"} row={true}>
                    <FormControl style={{ flexGrow: "1", marginRight: "6%", marginTop: "2%" }}>
                        <Select
                            name="expirationMonth"
                            id="expirationMonth"
                            value={props.cardDetails.expirationMonth}
                            onChange={props.handleChange}
                            label="Month"
                            variant={"outlined"}
                            required
                        >
                            <MenuItem value="">
                                <em>Month</em>
                            </MenuItem>
                            <MenuItem value={"01"}>01</MenuItem>
                            <MenuItem value={"02"}>02</MenuItem>
                            <MenuItem value={"03"}>03</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ flexGrow: "1", marginRight: "6%", marginTop: "2%" }}>
                        <Select
                            name="expirationYear"
                            id="expirationYear"
                            value={props.cardDetails.expirationYear}
                            onChange={props.handleChange}
                            label="Year"
                            variant={"outlined"}
                            required
                        >
                            <MenuItem value="">
                                <em>Year</em>
                            </MenuItem>
                            <MenuItem value={"2021"}>2021</MenuItem>
                            <MenuItem value={"2022"}>2022</MenuItem>
                            <MenuItem value={"2023"}>2023</MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup>
            </FormControl>
            <FormControl margin={"dense"} className={classes.cvv}>
                <InputLabel shrink htmlFor="cvv">
                    CVV
                 </InputLabel>
                <InputBase className={classes.input} required onChange={props.handleChange} value={props.cardDetails.cvv} id="cvv" name={"cvv"} />
            </FormControl>
            <Button onClick={props.onSubmit} variant="contained" color="primary" fullWidth className={classes.submitButton}>
                Submit
            </Button>
        </Paper>
    )
}