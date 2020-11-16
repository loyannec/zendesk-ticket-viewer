$(() => {
    var ticketsList = { page: 1 }
    var loadingTrigger = null
    var isLoading = false
    var canFetchMore = true

    $('#tickets-container').scroll((event) => {
        var list = event.target
        var hasScrolledToBottom = list.scrollHeight - list.scrollTop === list.clientHeight

        if (hasScrolledToBottom) {
            clearTimeout(loadingTrigger)
            loadingTrigger = setTimeout(fetchNextPage, 500)
        }
    })

    function fetchNextPage() {
        if (isLoading) { return }

        var nextPage = ticketsList.page + 1
        isLoading = true
        console.log('fetch next page: ' + nextPage)

        $.getJSON(`/list-tickets?page=${nextPage}`, (nextListPage, status) => {
            if (status === 'success') {
                page += 1
                if (typeof(tickets) === 'string') {
                    $('#tickets-container').append(tickets)
                } else {
                    canFetchMore = false
                }
            }
            isLoading = false
        })
    }
})
