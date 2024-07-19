export const chartSettings = ({ name, text, colors }) => {
    return {
        series: [{ name, data: [] }],
        options: {
            chart: {
                type: "bar",
                height: 150,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "80%",
                    endingShape: "rounded",
                },
            },
            colors: colors,
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            },
            yaxis: {
                show: false,
                title: {
                    text: text,
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    },
                },
            },
        },
    }
}