/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hotandcold;

import hotandcold.coord;

/**
 *
 * @author guto
 */
public class element {
    public coord c;
    public String user;
    public int id;
    
    public element(coord cy, String muser, int mid){
        this.c = cy;
        this.user = muser;
        this.id = mid;
    }
    
    
}
