/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ap.guestmap.web;

import com.ap.guestmap.model.Message;
import com.ap.guestmap.model.MessageDAO;
import com.ap.guestmap.utils.ObjectToJSON;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author pollini
 */
@WebServlet(name = "MessageServlet", urlPatterns = {"/messages"})
public class MessageServlet extends HttpServlet {

    private MessageDAO messageDAO;

    @Override
    public void init() throws ServletException {
        super.init(); //To change body of generated methods, choose Tools | Templates.
        try {
            messageDAO = MessageDAO.getInstance();
            messageDAO.add(new Message("ciao", 23, 34.45f));
            
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(MessageServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
  
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            List<Message> allMessages = messageDAO.getAll();
            JSONObject out = new JSONObject();
            
            JSONArray messagesJSON = new JSONArray();
            //loop sui messaggi
            for( Message m : allMessages) {
                JSONObject messageJSON = new JSONObject();
                messageJSON.put("content", m.getContent());
                messagesJSON.add(messageJSON);
            }
            out.put("messages", ObjectToJSON.of(allMessages));
             
            
            PrintWriter writer = response.getWriter();
            //writer.write(out.toJSONString());
            writer.write(ObjectToJSON.of(allMessages).toJSONString());
            writer.flush();
            writer.close();
        } catch (IllegalArgumentException ex) {
            Logger.getLogger(MessageServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(MessageServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            /* riceve JSON del tipo
            {
            "content": "....",
            "lat": 23.435,
            "lon": 12.234
            }
            */
            // recupero il bory della richiesta dal reader req.getReader()
            String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            System.out.println("POST! ->" + body);
            JSONParser parser = new JSONParser();
            JSONObject parsedJSON = (JSONObject)parser.parse(body);
            System.out.println("content: " + parsedJSON.get("content"));
            Message msg = new Message((String)parsedJSON.get("content"), 
                   Double.parseDouble(parsedJSON.get("lat").toString()), (double)parsedJSON.get("lon"));
            messageDAO.add(msg);
        } catch (ParseException ex) {
            Logger.getLogger(MessageServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    
    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
