import moment from"moment";

const momentShort = (timeAgo) =>{
  const time = moment(timeAgo).fromNow()
  return time.replace("a few seconds ago","just now").replace("a minute","1m").replace(" hours", "h").replace(" minutes", "m").replace(" days", "d").replace(" seconds", "s").replace(" years", "y");
}

export default momentShort;