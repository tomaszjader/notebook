class NotesController < ApplicationController
  before_action :set_note, only: %i[ show update destroy ]

  # GET /notes
  def index
    @notes = Note.where(user_id: params[:user_id])
    render json: @notes
  end

  # GET /notes/1
  def show
    @notes = Note.find(params[:user_id])
    render json: @note
  end

  # POST /notes
  def create
    @user = User.find(params[:user_id])  # Znajdujesz użytkownika na podstawie parametru user_id
    @note = @user.notes.build(note_params)  # Tworzysz nową notatkę powiązaną z tym użytkownikiem

    if @note.save
      redirect_to user_note_url(@user, @note), notice: "Notatka została pomyślnie utworzona."  # Przekierowujesz z user_id i note_id
    else
      render :new
    end
  end

  # PATCH/PUT /notes/1
  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  def destroy
    @note.destroy!
  end

  def short
    user_id = params[:user_id]
    note_id = params[:id]    
    note = Note.find_by(id: note_id, user_id: user_id)
    puts note.content
    client = OpenAI::Client.new(
          access_token: ENV["OPENAI_API_KEY"],
          log_errors: true # Highly recommended in development, so you can see what errors OpenAI is returning. Not recommended in production because it could leak private data to your logs.
        )
        begin
          response = client.chat(
            parameters: {
              model: "gpt-4", # Użyj poprawnej nazwy modelu, np. "gpt-4" lub "gpt-3.5-turbo".
              messages: [ { role: "system", content: "Read the following notes and provide a concise summary. Focus on the main ideas and key points, omitting any unnecessary details. Aim for clarity and brevity, capturing the essence of the content in just a few sentences." }, { role: "user", content: note.content } ]
            }
          )

          puts response.dig("choices", 0, "message", "content")
        #   render plain: response.dig("choices", 0, "message", "content")
        render json: { "content": response.dig("choices", 0, "message", "content") }
        rescue => e
          # Logowanie błędów w trybie development
          Rails.logger.error("Błąd OpenAI: #{e.message}") if Rails.env.development?
          #   render plain: "blad"
        end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_note
      @note = Note.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def note_params
      params.require(:note).permit(:title, :content, :user_id)
    end
end
