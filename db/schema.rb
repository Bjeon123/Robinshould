# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_14_214149) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "holdings", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "ticker_id", null: false
    t.float "avg_price", null: false
    t.float "shares", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ticker_id"], name: "index_holdings_on_ticker_id"
    t.index ["user_id", "ticker_id"], name: "index_holdings_on_user_id_and_ticker_id", unique: true
    t.index ["user_id"], name: "index_holdings_on_user_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "ticker", null: false
    t.string "company_name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ticker"], name: "index_stocks_on_ticker"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "first_name", null: false
    t.string "address", null: false
    t.float "total_capital", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "last_name", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "watchlist_joins", force: :cascade do |t|
    t.integer "watchlist_id", null: false
    t.integer "stock_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["stock_id"], name: "index_watchlist_joins_on_stock_id"
    t.index ["watchlist_id", "stock_id"], name: "index_watchlist_joins_on_watchlist_id_and_stock_id"
    t.index ["watchlist_id"], name: "index_watchlist_joins_on_watchlist_id"
  end

  create_table "watchlists", force: :cascade do |t|
    t.string "name", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_watchlists_on_user_id"
  end

end
