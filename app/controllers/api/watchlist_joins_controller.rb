class Api::WatchlistJoinsController < ApplicationController
    def create
        @watchlist_join = WatchlistJoin.new(watchlist_join_params)
        if(@watchlist_join.save)
            render json: @watchlist_join
        else
             render json: @watchlist_join.errors.full_messages, status: 422
        end
    end

    def update
        @watchlist_join = WatchlistJoin.find(params[:id])
        if(@watchlist_join.update(watchlist_join_params))
            render json: @watchlist_join
        end
    end

    def destroy
        @watchlist_join = WatchlistJoin.find(params[:id])
        if(@watchlist_join.delete)
            render json: @watchlist_join
        end
    end

    private 
    
    def watchlist_join_params
        params.require(:watchlist_join).permit(:watchlist_id,:stock_id)
    end
end