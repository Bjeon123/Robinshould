json.extract! user, :id, :email, :first_name, :last_name, :total_capital

json.holdings do 
    user.holdings.each do |holding|
        json.set! holding.id do
            json.extract! holding, :id, :user_id, :ticker_id,:avg_price, :shares
            json.extract! holding.stock, :ticker
        end
    end
end
