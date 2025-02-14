export const formatCurrency = (value: string | number) => {
    if (!value) return "";
    const numericValue = Number(value.toString().replace(/\D/g, "")) / 100;
    return numericValue.toLocaleString("us", { style: "currency", currency: "USD" });
};