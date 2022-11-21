require 'fileutils'
require 'nokogiri'

class FileHelper
    def create_conditions(input)
      conditions = File.open("_conditions.txt", "w") {|f| f.write("testing hello hello hello")}
    end

    def esp_to_xml(file_path)
      FileUtils.cp_r(file_path, "./conversion")
      File.rename("./conversion/#{File.basename(file_path)}", "./conversion/OriginalFile.esp")
     system("cd conversion && bethkit convert OriginalFile.esp ConvertedFile.xml")
      
    end

    def get_weapons_from_xml(file_path)
      output = {}
      doc = Nokogiri::XML(File.open(file_path))
      weapons = doc.xpath("//WEAP")
      weapons.each do |weapon|
          xml = Nokogiri::XML::DocumentFragment.parse(weapon)
        id = weapon.attr("id")
        id[0] = "0"
        id[1] = "x"
          if (weapon.at("FULL")) 
              output[id] = weapon.at("FULL").content
          end
      end
      puts output
      return output
    end

  

end