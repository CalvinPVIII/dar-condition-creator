class UIHelper
   def initialize stack
     @stack = stack
   end
   def add msg
    @stack.app do
       para msg rescue puts $!
     end
   end
 end