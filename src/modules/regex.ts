const Regex = {
  id: /^[a-z0-9]{16}$/,
  command: /\/[a-z_]+/m,
  command_with_username: /\/[a-zA-Z0-9_@]+/,
  username: /[a-zA-Z_0-9]{5,32}/
}

export default Regex
