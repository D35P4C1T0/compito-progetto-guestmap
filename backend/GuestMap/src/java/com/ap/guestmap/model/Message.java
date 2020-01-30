/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ap.guestmap.model;

/**
 *
 * @author pollini
 */

public class Message {
    
    
    private String content;
    private double lat;
    private double lon;
    private String id;

    public Message(String content, double lat, double lon) {
        this.content = content;
        this.lat = lat;
        this.lon = lon;
        
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }
    
    

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
    
    

    public String getContent() {
        return content;
    }

   
    
}
