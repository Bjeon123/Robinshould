@stocks.each do |stock|
    json.set! stock.id do 
        json.extract! stock, :ticker
    end
end