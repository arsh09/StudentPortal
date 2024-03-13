export const handleAddNotification = ({ commit }, notification) => {
    const dt = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"2-digit", hour : "2-digit" , minute : "2-digit" , second : "2-digit"}).replaceAll(",", "").replaceAll(":","-")
    let fix = { type : "dark", delay : 5000, msg : "", title : "Notification", date : dt }
    notification = { ...fix, ...notification }
    commit('PUSH_NOTIFICATION', notification);
}

export const handleRemoveNotification = ({ commit }, notification) => {
    console.log(`[Notification][${notification.type}]-> ${notification.msg}`)
    commit('REMOVE_NOTIFICATION', notification);
}