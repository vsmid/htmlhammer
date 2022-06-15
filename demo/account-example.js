import {
    br,
    button,
    div,
    h5,
    input,
    label,
    setRef,
    style,
    table,
    td,
    th,
    tr,
} from "../esm/index.js";

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

export const AccountInfo = (data) =>
    div(
        { class: "accountInfo" },
        h5({}, "Account info"),
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
        h5({}, "Transactions"),
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
        button(
            {
                onclick: () =>
                    alert(
                        "Total amount spent: " +
                            data.transactions.reduce(
                                (acc, trx) => acc + trx.amount,
                                0
                            ) +
                            ` ${data.currency}`
                    ),
            },
            "Total amount spent"
        )
    );
