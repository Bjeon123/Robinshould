export const getCurrentUser = userId => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}`
    })
)

export const editCurrentUser = user => (
    $.ajax({
        method: "PATCH",
        url: `/api/users/${user.id}`,
        data: {user}
    })
)