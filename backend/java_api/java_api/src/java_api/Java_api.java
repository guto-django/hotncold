/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package java_api;

import hotandcold.HNCAPI;
import hotandcold.element;
import java.util.List;

/**
 *
 * @author guto
 */
public class Java_api {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        
        HNCAPI a = new HNCAPI();
        
        System.out.println(a.register("Carlos",0.1,0.1,false));
        System.out.println(a.register("Guto",0.1,0.1,false));
        System.out.println(a.register("Django",0.1,0.1,false));

        List<element> list = a.list();
        
        for(element e : list)
            System.out.println(e.user);
        
    }
    
}
