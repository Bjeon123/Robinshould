class User < ApplicationRecord
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :email, presence: true, uniqueness: true
    validates :session_token, :password_digest, :first_name, :last_name, :address, :total_capital, presence: true
    
    has_many :holdings,
        foreign_key: :user_id,
        class_name: :Holding

    has_many :stocks,
        through: :holdings,
        source: :stock

    has_many :watchlists,
        foreign_key: :user_id,
        class_name: :Watchlist

    attr_reader :password
    
    after_initialize :ensure_session_token

    def self.find_by_credentials(email,password)
        user =User.find_by(email: email)
        if(user && user.isPassword?(password))
            return user
        else
            return nil;
        end
    end

    def isPassword?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end
end