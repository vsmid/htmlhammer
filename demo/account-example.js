import {
    br,
    button,
    div,
    h2,
    input,
    label,
    ref,
    setRef,
    style,
    table,
    td,
    th,
    tr,
} from "../esm/index.js";

const accountData = {
    iban: "HR23600011001224234",
    balance: 235.45,
    currency: "EUR",
    transactions: [
        {
            date: new Date(),
            amount: 0.11,
            purpose: "Toy-Toy",
        },
        {
            date: new Date(),
            amount: 11.19,
            purpose: "Plush rabbit",
        },
        {
            date: new Date(),
            amount: 12.33,
            purpose: "Coca-Cola, 2l",
        },
        {
            date: new Date(),
            amount: 34.23,
            purpose: "A4 paper bundle",
        },
        {
            date: new Date(),
            amount: 0.21,
            purpose: "Coffee can",
        },
    ],
};

export const accountStyle = style(
    {},
    `
.accountInfo {
    font-family: helvetica;
    font-size: 18px;
}

.accountInfo label {
    font-weight: lighter;
}

.accountInfo input {
    font-size: 18px;
    outline: none;
    border: none;
}

.accountInfo td {
    font-size: 14px;
    text-align: center;
}
`
);

const getTransactionsTableViaRef = () => ref(accountData.transactions);

const SpentButton = (trxs, currency) =>
    button(
        {
            onclick: () =>
                alert(
                    "Total amount spent: " +
                        trxs.reduce((acc, trx) => acc + trx.amount, 0) +
                        ` ${currency}`
                ),
        },
        "Total amount spent"
    );

export const AccountInfo = (data) =>
    div(
        { class: "accountInfo" },
        h2({}, "Account info"),
        label({ for: "iban" }, "IBAN:"),
        input({
            id: "iban",
            readonly: true,
            value: data.iban,
        }),
        br(),
        label({ for: "bal" }, "Balance:"),
        input({
            id: "bal",
            readonly: true,
            value: data.balance,
        }),
        br(),
        label({ for: "curr" }, "Currency:"),
        input({
            id: "curr",
            readonly: true,
            value: data.currency,
        }),
        br(),
        h2({}, "Transactions"),
        table(
            { $ref: data.transactions },
            tr({}, th({}, "Date"), th({}, "Amount"), th({}, "Purpose")),
            tr(
                {
                    $for: data.transactions,
                    $if: (trx) => trx.amount > 0.2,
                    $ref: setRef,
                },
                (trx) => [
                    td({}, trx.date.toISOString()),
                    td(
                        {
                            style: {
                                textAlign: "right",
                            },
                        },
                        trx.amount
                    ),
                    td({}, trx.purpose),
                ]
            )
        ),
        SpentButton(data.transactions, data.currency),
        button(
            {
                onclick: () =>
                    console.log(
                        "Transactions table:",
                        getTransactionsTableViaRef()
                    ),
            },
            "Print transactions table to console via ref"
        )
    );

export const DefaultAccountInfo = AccountInfo(accountData);
