class Watchlist < ApplicationRecord
    validates :name, :user_id, presence: true
    validates :name, uniqueness: {scope: :user_id}

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
        
    has_many :watchlist_joins,
        foreign_key: :watchlist_id,
        class_name: :WatchlistJoin

    has_many :stocks, 
        through: :watchlist_joins, 
        source: :stock
end