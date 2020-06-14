package com.example.demo.exception;

import com.example.demo.model.JwtAuthenticationResponse;

public class BusinessException extends Exception{
    public Integer status;

    public JwtAuthenticationResponse response;

    public BusinessException(Integer status, String message) {
        super(message);
        this.status=status;
       // this.response=response;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public JwtAuthenticationResponse getResponse() {
        return response;
    }

    public void setResponse(JwtAuthenticationResponse response) {
        this.response = response;
    }
}
