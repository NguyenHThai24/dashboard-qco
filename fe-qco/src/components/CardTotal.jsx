function CartdTotal({ title, amount }) {
  return (
    <div className="card-total">
      <h3 className="card-total__title">{title}</h3>
      <p className="card-total__amount">${amount.toFixed(2)}</p>
    </div>
  );
}
export default CartdTotal;
