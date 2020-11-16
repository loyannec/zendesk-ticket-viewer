$(() => {
    var page = 1
    var loadingTrigger = null
    var isLoading = false
    var loading = $('#loading')
    var listContainer = $('#tickets-container')

    $(window).scroll(() => {
        var hasScrolledToBottom = $(window).height() + $(window).scrollTop() == $(document).height()

        if (hasScrolledToBottom && canFetchMore()) {
            clearTimeout(loadingTrigger)
            loadingTrigger = setTimeout(fetchNextPage, 500)
        }
    })

    function fetchNextPage() {
        if (isLoading) { return }

        showLoading()

        $.get(`/tickets?page=${page + 1}`, (result, status) => {
            hideLoading()

            if (status === 'success') {
                page += 1
                listContainer.append(result.html)
            }
        })
    }

    function canFetchMore() {
        return listContainer.children().last().hasClass('list-end') === false
    }

    function showLoading() {
        isLoading = true
        loading.addClass('show-loading')
        loading.removeClass('d-none')
    }

    function hideLoading() {
        setTimeout(() => {
            loading.removeClass('show-loading')
            isLoading = false
        }, 300)
    }
})

function showTicket(identifier, linkElement) {
    var detailsContainer = $(linkElement.parentNode.parentNode.nextElementSibling.firstElementChild)

    $.get(`/ticket/${identifier}`, (html, status) => {
        if (status === 'success') {
            detailsContainer.html(html)
        }
    })
}
