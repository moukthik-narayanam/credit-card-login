import React, { useRef, useEffect, useMemo } from 'react';
import { Paper, Avatar, makeStyles, InputBase, Slide } from '@material-ui/core';
import ReactTextTransition from 'react-text-transition';
import { formatCreditCardNumber } from './cardUtils';
import { CARD_TYPES } from './cards';

const useStyles = makeStyles(() => ({
    container: {
        transition: "transform 0.6s",
        transformStyle: "preserve-3d",
        width: "24%",
        left: "50%",
        position: "absolute",
        transform: "translateX(-50%)translateY(-50%)",
        transformOrigin: "left",
        top: "20%",
        zIndex: "2",
        color: "white",
        minHeight: "200px"
    },
    flipCard: {
        width: "96%",
        backfaceVisibility: "hidden",
        height: "96%",
        position: "absolute",
        padding: " 2%",
        overflow:"hidden"
    },
    flipCardBack: {
        transform: "rotateY(180deg)",
        width: "96%",
        backfaceVisibility: "hidden",
        height: "96%",
        position: "absolute",
        padding: " 2%"
    },
    chip: {
        color: "transparent",
        width: "100%",
        height: "auto",
        objectFit: "cover",
        textAlign: "center",
        textIndent: "10000px",
    },
    backLogo: {
        position: "absolute",
        bottom: "5%",
        right: "4%",
        width: "70px",
        height: "auto"
    }
}))

export default function CreditCardPreview(props) {

    const classes = useStyles();
    const card = useRef();

    const transformedCardDetils = useMemo(() => {
        const { cardNumber, cardHolderName, expirationMonth, expirationYear } = props.cardDetails;

        return {
            ...props.cardDetails,
            cardNumber: formatCreditCardNumber(cardNumber, true),
            cardHolderName: cardHolderName || "Name",
            expirationMonth: expirationMonth || "MM",
            expirationYear: expirationYear || "YYYY"
        }
    }, [props.cardDetails])

    const styles = {
        paperContainer: {
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/${CARD_TYPES["amex"]?.background})`
        }
    };

    useEffect(() => {
        if (transformedCardDetils.focusedElement === "cvv") {
            card.current.style.transform = "rotateY(180deg)translateX(-50%)translateY(-50%)"
        } else {
            card.current.style.transform = "rotateY(0deg)translateX(-50%)translateY(-50%)"
        }
    }, [transformedCardDetils.focusedElement])

    return (
        <Paper className={classes.container} ref={card}>
            <Paper className={classes.flipCard} style={styles.paperContainer} >
                <div style={{ display: "flex", justifyContent: "space-between", width:"100%",overflow:"hidden",minHeight:"70px" }}>
                    <Avatar alt="chip" variant={"square"} imgProps={{ className: classes.chip }} src={process.env.PUBLIC_URL + '/images/chip.png'} />
                    {
                        Object.keys(CARD_TYPES).map((type) =>
                            <Slide direction="down" in={type === transformedCardDetils.cardType}>
                                <Avatar alt={CARD_TYPES[transformedCardDetils.cardType]?.name} variant={"square"} style={{ width: "70px", height: "auto", display:"block",position:"absolute" ,right:"4%"}} imgProps={{ className: classes.chip }} src={`${process.env.PUBLIC_URL}/images/${CARD_TYPES[transformedCardDetils.cardType]?.logo}`} />
                            </Slide>
                        )
                    }

                </div>
                <div style={{ margin: "5% 2%", fontSize: "1.3rem", minHeight: "1.3rem", color: "white" }}>
                    {transformedCardDetils.cardNumber.split(" ").map((substring, i) => (
                        <>
                            {
                                substring.split("").map((n, j) => (
                                    <ReactTextTransition
                                        key={j}
                                        text={i === 0 || i === transformedCardDetils.cardNumber.split(" ").length - 1 ? n : n !== "#" ? "*" : n}
                                        inline
                                    />
                                ))
                            }
                            <span> </span>
                        </>
                    ))
                    }
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "white" }}>
                    <div>
                        <span style={{ color: "#ffffffc4", fontSize: "0.7rem" }}>Card Holder</span>
                        <div>{transformedCardDetils.cardHolderName}</div>
                    </div>
                    <div style={{ minWidth: "70px" }}>
                        <span style={{ color: "#ffffffc4", fontSize: "0.7rem" }} >Expires</span>
                        <div>
                            <ReactTextTransition
                                text={transformedCardDetils.expirationMonth}
                                inline
                            />
                                        /
                                        <ReactTextTransition
                                text={transformedCardDetils.expirationYear}
                                inline
                            />
                        </div>
                    </div>
                </div>
            </Paper>
            <Paper className={classes.flipCardBack} style={styles.paperContainer} >
                <div style={{ width: "100%", height: "20%", background: "black", position: "absolute", left: "0%", top: "8%" }}></div>
                <div style={{ marginTop: "16%", textAlign: "right" }}>
                    <span style={{ color: "white" }}>cvv</span>
                    <InputBase disabled inputProps={{ style: { textAlign: 'right', color: "black" } }} style={{ width: "96%", padding: "2%", background: "white", minHeight: "1.3rem" }} value={transformedCardDetils.cvv} type={"password"} ></InputBase>
                </div>
                <Avatar alt={CARD_TYPES[transformedCardDetils.cardType]?.name} variant={"square"} className={classes.backLogo} imgProps={{ className: classes.chip }} src={`${process.env.PUBLIC_URL}/images/${CARD_TYPES[transformedCardDetils.cardType]?.logo}`} />
            </Paper>
        </Paper>
    )
}

CreditCardPreview.defaultProps = {
    cardDetails: {
        cardNumber: "###################",
        cardHolderName: "Name",
        expirationMonth: "MM",
        expirationYear: "YY"
    }
}