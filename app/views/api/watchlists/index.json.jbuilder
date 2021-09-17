@watchlists.each do |watchlist|
    json.set! watchlist.id do
        json.extract! watchlist, :id, :name, :user_id
        json.watchlist_joins do
            json.array! watchlist.watchlist_joins
        end
        json.stocks do
            json.array! watchlist.stocks
        end
    end
end
