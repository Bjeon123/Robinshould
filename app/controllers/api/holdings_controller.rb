class Api::HoldingsController < ApplicationController
    def index
        @holdings= Holding.all
        render json: @holdings
    end

    def create
        @holding = Holding.new(holding_params)
        if(@holding.shares.to_i <=0)
            render json: ["Please enter a valid number of shares. "]
        elsif(@holding.save)
            render json: @holding
        else
             render json: @holding.errors.full_messages, status: 422
        end
    end

    def update
        @holding = Holding.find(params[:id])
        if(@holding.update(holding_params))
            render json: @holding
        end
    end

    def destroy
        @holding = Holding.find(params[:id])
        if (@holding)
            @holding.destroy
            render json: @holding
        end
    end

    private 
    
    def holding_params
        params.require(:holding).permit(:user_id,:ticker_id,:avg_price,:shares)
    end
end