class Api::WatchlistsController < ApplicationController
    def index
        @watchlists = current_user.watchlists
        render :index
    end

    def create
        @watchlist = Watchlist.new(watchlist_params)
        if(@watchlist.save)
            render :show
        else
            render json: @watchlist.errors.full_messages, status: 422
        end
    end

    def update
        @watchlist = Watchlist.find(params[:id])
        if(@watchlist.update(watchlist_params))
            render :show
        end
    end

    def destroy
        @watchlist = Watchlist.find(params[:id])
        if (@watchlist)
            @watchlist.destroy
            render :show
        end
    end

    private 
    
    def watchlist_params
        params.require(:watchlist).permit(:name,:user_id)
    end
end