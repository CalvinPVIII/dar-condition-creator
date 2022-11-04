require('file_creator.rb')

creator = File_Creator.new()

Shoes.app title: "DAR Generator" do

    # stack do
    #     @input = edit_line
    #     button "Test" do
    #         creator.test(@input.text)
    #     end
    # end

    flow do 
        @input = list_box items: ["first","second","third"]
        button("Input") do 
            creator.test(@input.text)
        end
    end
            

end