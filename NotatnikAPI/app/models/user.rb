class User < ApplicationRecord
    has_many :notes, dependent: :destroy  # Użytkownik ma wiele notatek
end
