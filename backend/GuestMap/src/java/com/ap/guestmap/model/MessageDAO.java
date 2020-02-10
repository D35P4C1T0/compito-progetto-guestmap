/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ap.guestmap.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Dell'Oro
 * 
 * DAO = DAta Access Object 
 * 
 * Pattern architetturale che descrive la modalità
 * di accesso ai dati salvati "da qualche parte".
 * 
 * Trasformazione di una classe in un singleton:
 * 
 * 1. metto privato il costruttore di default
 * 2. creo una variabile privata STATICA della classe stessa
 * 3. creo un metodo getInstance()
 * 
 */
public class MessageDAO {
    
    private List<Message> messages;
    private Connection conn;
    
    static private MessageDAO instance;
    
    static public MessageDAO getInstance() throws ClassNotFoundException, SQLException {
        if (instance==null){
            instance = new MessageDAO();
        }
        return instance;
    }
    
    

    private MessageDAO() throws ClassNotFoundException, SQLException {
        Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
        
        conn =DriverManager.getConnection("jdbc:derby://localhost:1527/GuestMap","app","app");
        
        messages = new ArrayList<>();
    }
    
    public int getMessageId(Message msg){
        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT ID FROM MESSAGE WHERE content =(?) AND lon =(?) AND lat=(?)");
            stmt.setString(1, msg.getContent());
            stmt.setDouble(2, msg.getLon());
            stmt.setDouble(3, msg.getLat());
            ResultSet rs = stmt.executeQuery();
            return rs.getInt("ID");
        } catch (SQLException ex) {
            Logger.getLogger(MessageDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return 0;
    }
    
    public void add(Message msg) {
        try {
            PreparedStatement st = conn.prepareStatement("INSERT INTO TEST.MESSAGE VALUES(?, ?, ?)");
            st.setString(3, msg.getContent());
            st.setDouble(1, msg.getLon());
            st.setDouble(2, msg.getLat());
            st.execute();
        } catch (SQLException ex) {
            Logger.getLogger(MessageDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
    }
    
    public List<Message> getAll() {
        List<Message> messages = new ArrayList<>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM MESSAGE");
            while(rs.next()) {
                //System.out.println(">>> " + rs.getString("content"));
                messages.add(new Message(rs.getString("CONTENT"),rs.getDouble("LONGITUDE"),rs.getDouble("LATITUDE")));
            }
            rs.close();
            
        } catch (SQLException ex) {
            Logger.getLogger(MessageDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return messages;
    }
    
    public void delete(Message msg){
        
    }
}
