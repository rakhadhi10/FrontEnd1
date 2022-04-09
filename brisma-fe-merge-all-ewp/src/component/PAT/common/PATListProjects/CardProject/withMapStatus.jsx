const withMapStatus = (map) => (WrappedComponent) => {
  return function ({ status }) {
    const { text, colorClass } = map[status] ? map[status] : { text: status, colorClass: "bg-primary-red" }
    return <WrappedComponent text={text} colorClass={colorClass} />
  }
}

export default withMapStatus;
