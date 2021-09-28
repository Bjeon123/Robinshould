require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Stock.delete_all
Holding.delete_all
Watchlist.delete_all
WatchlistJoin.delete_all

demoUser = User.create!(email: "demo@demo.com", first_name: "demo", last_name: "user", password: '123456', address: "demo st", total_capital:10000.50)

CSV.foreach(("app/assets/stock_info/stockTickerAndName.csv"), headers: true, col_sep: ",") do |row|
    Stock.create!(ticker: row[0],company_name: row[1])
end 



