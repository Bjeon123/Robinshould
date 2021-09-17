class Api::StocksController < ApplicationController
    def index 
        if(params[:user_id])
            @user = User.find(params[:user_id])
            @stocks = @user.stocks
        end
    end

    def show
        if (params[:id].to_i == 0)
            @stock = Stock.find_by(ticker: params[:id])
            render json: @stock.id
        else
            @stock = Stock.find(params[:id])
            render json: @stock
        end
    end
end