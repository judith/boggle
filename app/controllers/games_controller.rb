class GamesController < ApplicationController
  DICE = %W(
  AAAFRS
  AAEEEE
  AAFIRS
  ADENNN
  AEEEEM
  AEEGMU
  AEGMNN
  AFIRSY
  BJKQXZ
  CCNSTW
  CEIILT
  CEILPT
  CEIPST
  DDLNOR
  DHHLOR
  DHHNOT
  DHLNOR
  EIIITT
  EMOTTT
  ENSSSU
  FIPRSY
  GORRVW
  HIPRRY
  NOOTUW
  OOOTTU
  );
  
  def index
    @grid = DICE.shuffle.map{ |die| die.chars.sample }
  end
  
  def score_word
    word = params[:word]
    score = if Dictionary.where(word: word).exists?
      score(word)
    else
      -1
    end
    render text: score
  end
  
  private
  
  def score(word)
  	length = word.gsub("Qu", "Q").length
    if length.between?(3, 4)
  	  1
    elsif length == 5
      2
    elsif length == 6
      3
    elsif length == 7
      5
    elsif length >= 8
      11
    else
      0
    end
  end
end