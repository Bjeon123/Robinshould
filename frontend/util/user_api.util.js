export const getCurrentUser = userId => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}`
    })
)