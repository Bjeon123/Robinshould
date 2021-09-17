
export const createHolding = holding => {
    return (
        $.ajax({
            method: "POST",
            url: `/api/holdings`,
            data: { holding }
        })
    )
}

export const updateHolding = holding => (
    $.ajax({
        method: "PATCH",
        url: `/api/holdings/${holding.id}`,
        data: { holding }
    })
)

export const deleteHolding = holding => (
    $.ajax({
        method: "DELETE",
        url: `/api/holdings/${holding.id}`,
    })
)




