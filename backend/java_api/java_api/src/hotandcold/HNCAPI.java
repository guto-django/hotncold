/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hotandcold;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author guto
 */
public class HNCAPI {
    
    public String servIP = "http://10.137.29.243:1337/?";
    
            
    public HNCAPI(){
    
    }
    
    public String register(String user,double lon,double lat,boolean set){
        
        String request = servIP+ "verb=r&user="+user;
        
        if(set)
            request += "&long="+lon+"&lat="+lat;
        
        HttpClient client = new DefaultHttpClient();
        
        HttpGet get = new HttpGet(request);
        
        ResponseHandler<String> responseHandler = new BasicResponseHandler();
        
        String responseBody;
        try {
            responseBody = client.execute(get, responseHandler);
            return responseBody;
        } catch (IOException ex) {
            Logger.getLogger(HNCAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        
        return null;
    }
    
    public List<element> list() {
        String request = servIP + "verb=l";
        
        HttpClient client = new DefaultHttpClient();
        
        HttpGet get = new HttpGet(request);
        
        ResponseHandler<String> responseHandler = new BasicResponseHandler();
        
        try {
            String responseBody = client.execute(get, responseHandler);
            List <element> list = new LinkedList<>();
            
            JSONArray obj = new JSONArray(responseBody);
            
            
            
            for(int i = 0; i < obj.length();i++){

                JSONObject o = obj.getJSONObject(i);
                
                JSONObject t = o.getJSONObject("coord");
                
                coord c = new coord(t.getDouble("long"),t.getDouble("lat"));
               
                element e = new element(c,o.getString("user"),i);
                list.add(e);
            }
            
            
            return list;
            
        } catch (IOException | JSONException ex) {
            Logger.getLogger(HNCAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return null;
    }
    
    public coord getinfo(int id){
        String request = servIP + "verb=g&id="+id;
        
        HttpClient client = new DefaultHttpClient();
        
        HttpGet get = new HttpGet(request);
        
        ResponseHandler<String> responseHandler = new BasicResponseHandler();
        
        try {
            String responseBody = client.execute(get, responseHandler);
            
            JSONObject obj = new JSONObject(responseBody);
            
            obj = obj.getJSONObject("coord");
            
            coord c = new coord(obj.getDouble("long"),obj.getDouble("lat"));
            
            return c;
        } catch (IOException | JSONException ex) {
            Logger.getLogger(HNCAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return null;
    }
    
    
    public boolean setCoord(int id,coord c){
        
        String request = servIP+"verb=p&id="+id;
        
        request += "&long="+c.lon+"&lat="+c.lat;
        
        HttpClient client = new DefaultHttpClient();
        
        HttpGet get = new HttpGet(request);
        
        ResponseHandler<String> responseHandler = new BasicResponseHandler();
        try {
            client.execute(get, responseHandler);
            
            return true;
        } catch (IOException ex) {
            Logger.getLogger(HNCAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }
    
}
