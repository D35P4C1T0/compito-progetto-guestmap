/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ap.guestmap.utils;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author pollini
 */
public class ObjectToJSON {
    static public JSONObject of(Object object) throws IllegalArgumentException, IllegalAccessException {
        Class<?> clazz = object.getClass(); // recupero il tipo del parametro
        Map<String, String> jsonElementsMap = new HashMap<>();
    for (Field field : clazz.getDeclaredFields()) {
        field.setAccessible(true);
        System.out.println(" -> " + field.getAnnotations().toString());
        if (field.isAnnotationPresent(JsonElement.class)) {
            jsonElementsMap.put(field.getName(), (String) field.get(object));
        }
        if (field.isAnnotationPresent(JsonList.class)) {
            JSONArray arr = new JSONArray();
            arr.addAll((Collection)field.get(object));
            jsonElementsMap.put(field.getName(), (String) field.get(object));
        }
        if(field.getClass().isArray()) {
            System.out.println("array");
            JSONArray arr = new JSONArray();
            arr.addAll((Collection)field.get(object));
            jsonElementsMap.put(field.getName(), (String) field.get(object));
            
        }
        System.out.println("!! " + jsonElementsMap);
    }
    return  new JSONObject(jsonElementsMap);
    
    }
}
