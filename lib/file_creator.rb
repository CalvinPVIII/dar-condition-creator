class FileCreator

    def test(input)
        print(input)
        
    end

    def create_conditions(input)
      conditions = File.open("_conditions.txt", "w") {|f| f.write("testing hello hello hello")}

        
    end

end