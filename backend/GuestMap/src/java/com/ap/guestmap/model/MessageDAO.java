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
 * @author pollini
 * 
 * DAO = Data Access Object 
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
        
        conn = DriverManager.getConnection("jdbc:derby://localhost:1527/guestmap","test","test");
        // connessione al db di netbeans
        
        messages = new ArrayList<>();
    }
    
    public void add(Message msg) {
        try {
            //messages.add(msg);
            PreparedStatement st = conn.prepareStatement("INSERT INTO TEST.MESSAGES VALUES(?)");
            // qua dovresti cambiare la roba di test con qualcosa di finale
            st.setString(1, msg.getContent());
            st.execute();
        } catch (SQLException ex) {
            Logger.getLogger(MessageDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
    }
    
    public List<Message> getAll() {
        List<Message> messages = new ArrayList<>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM MESSAGES");
            // lancia la query SQL
           
            while(rs.next()) {
                // da cambiare
                System.out.println(">>> " + rs.getString("message"));
                
                
                messages.add(new Message(rs.getString("message"),0,0));
                // la funzione sopra non fa altro che prendere tutti i messaggi e aggiungerli
                // alla lista messages. Sopra si nota che crea un messaggio nuovo ogni
                // volta per motivi di debug, perchè in origine non aveva messaggi.
            }
            rs.close(); //chiude la connessione
            
        } catch (SQLException ex) {
            Logger.getLogger(MessageDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return messages;
    }
}
