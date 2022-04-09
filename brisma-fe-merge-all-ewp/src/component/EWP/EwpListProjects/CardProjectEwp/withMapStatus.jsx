const withMapStatus = (WrappedComponent, map) => {
  return function ({ status }) {
    const { text, colorClass } = map[status]
    return <WrappedComponent text={text} colorClass={colorClass} />
  }
}

export default withMapStatus;